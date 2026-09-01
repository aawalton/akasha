import { assertNever } from "@akasha/utils-narrow/assert-never"
import { z } from "zod"

export const DESIGN_KINDS = ["companion-design", "floor-design", "world-logic"] as const
export type DesignKind = (typeof DESIGN_KINDS)[number]

export function isDesignKind(s: string): s is DesignKind {
  return DESIGN_KINDS.some((k) => k === s)
}

export const EnemyDesignSchema = z
  .object({
    name: z.string().min(1),
    role: z.string().min(1).optional(),
    readableTrait: z.string().min(1).optional(),
  })
  .strict()
export type EnemyDesign = z.infer<typeof EnemyDesignSchema>

export const ItemDesignSchema = z
  .object({
    name: z.string().min(1),
    effect: z.string().min(1).optional(),
    source: z.string().min(1).optional(),
  })
  .strict()
export type ItemDesign = z.infer<typeof ItemDesignSchema>

export const ClueDesignSchema = z
  .object({
    component: z.string().min(1),
    dealSite: z.string().min(1),
  })
  .strict()
export type ClueDesign = z.infer<typeof ClueDesignSchema>

export const DesignContentSchema = z
  .discriminatedUnion("kind", [
    z
      .object({
        kind: z.literal("companion-design"),
        talent: z.string().min(1),
        activation: z.string().min(1),
        designSeeds: z.string().min(1).optional(),
      })
      .strict(),
    z
      .object({
        kind: z.literal("floor-design"),
        challenge: z.string().min(1),
        enemies: z.array(EnemyDesignSchema),
        items: z.array(ItemDesignSchema),
        layout: z.string().min(1).optional(),
        challengeOwner: z.enum(["character", "player"]).optional(),
        clues: z.array(ClueDesignSchema).optional(),
      })
      .strict(),
    z
      .object({
        kind: z.literal("world-logic"),
        rule: z.string().min(1),
        implications: z.string().min(1).optional(),
      })
      .strict(),
  ])
  .superRefine((content, ctx) => {
    if (
      content.kind === "floor-design" &&
      content.challengeOwner === "player" &&
      (content.clues === undefined || content.clues.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["clues"],
        message:
          "a player-owned floor-design must enumerate its fair-play clue set (challengeOwner='player' requires a non-empty clues[]): the pieces the player needs must be dealt on the page, never answer-only in the GM's head",
      })
    }
  })
export type DesignContent = z.infer<typeof DesignContentSchema>

export const DesignEntryInputSchema = z
  .object({
    externalId: z.string().min(1),
    subjectKey: z.string().min(1),
    content: DesignContentSchema,
    supersedes: z.string().min(1).optional(),
    sourceRef: z.string().min(1).optional(),
  })
  .strip()
export type DesignEntryInput = z.infer<typeof DesignEntryInputSchema>

export function designKindOf(content: DesignContent): DesignKind {
  return content.kind
}

export interface DesignCompletenessResult {
  readonly ok: boolean
  readonly reason?: string
}

function blank(s: string): boolean {
  return s.trim().length === 0
}

export function decideDesignCompleteness(content: DesignContent): DesignCompletenessResult {
  switch (content.kind) {
    case "companion-design":
      if (blank(content.talent)) return { ok: false, reason: "companion-design has no talent" }
      return blank(content.activation)
        ? {
            ok: false,
            reason:
              "companion-design has no concrete activation condition (the Aria-gap class — a talent authored without its trigger)",
          }
        : { ok: true }
    case "floor-design":
      if (blank(content.challenge)) {
        return { ok: false, reason: "floor-design has no challenge design" }
      }
      if (content.challengeOwner === undefined) {
        return {
          ok: false,
          reason:
            "floor-design has no challengeOwner (v28 challenge-ownership — every challenge must declare whether the character or the player solves it)",
        }
      }
      if (
        content.challengeOwner === "player" &&
        (content.clues === undefined || content.clues.length === 0)
      ) {
        return {
          ok: false,
          reason:
            "player-owned floor-design has no fair-play clue set (the pieces the player must be dealt to solve it himself)",
        }
      }
      if (content.enemies.length === 0) {
        return { ok: false, reason: "floor-design has an empty enemy roster" }
      }
      if (content.items.length === 0) {
        return {
          ok: false,
          reason: "floor-design has no item inventory (designed short of the floor's items)",
        }
      }
      return { ok: true }
    case "world-logic":
      return blank(content.rule) ? { ok: false, reason: "world-logic has no rule" } : { ok: true }
    default:
      return assertNever(content)
  }
}

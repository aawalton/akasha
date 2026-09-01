import { z } from "zod"
import {
  ControlledEntityKindSchema,
  GameConfigSchema,
  GameDisplayConfigSchema,
  GameGenreSchema,
  GameRulebookSchema,
  MechanicsWeightSchema,
  ResolutionSchema,
} from "../game-schema/game-schema.module.code.ts"
import {
  GmContextSchema,
  GmReferenceSchema,
} from "../gm-context-schema/gm-context-schema.module.code.ts"
import { NarrativeContinuitySchema } from "../narrative-continuity-schema/narrative-continuity-schema.module.code.ts"
import { ResolutionMechanismSchema } from "../roll-schema/roll-schema.module.code.ts"

export interface GameConfigViolation {
  readonly field: string
  readonly message: string
}

const GameConfigObjectSchema = z.object({
  externalId: z.string().min(1),
  title: z.string().min(1),
  coordinatorAgent: z.string().min(1),
  mechanicsWeight: MechanicsWeightSchema,
  controlledEntityKind: ControlledEntityKindSchema,
  resolution: ResolutionSchema,
  displayConfig: GameDisplayConfigSchema,
  requiresPerTurnGate: z.boolean().optional(),
  maintainsLore: z.boolean().optional(),
  maintainsDesign: z.boolean().optional(),
  resolutionMechanism: ResolutionMechanismSchema.optional(),
  gmContext: GmContextSchema.optional(),
  gmReference: GmReferenceSchema.optional(),
  genre: z.array(GameGenreSchema).optional(),
  currentSession: z.number().int().positive().optional(),
  description: z.string().optional(),
  premise: z.string().optional(),
  tone: z.string().optional(),
  themes: z.string().optional(),
  readerFraming: z.string().optional(),
  rulebook: GameRulebookSchema.optional(),
  narrativeContinuity: NarrativeContinuitySchema.optional(),
  config: GameConfigSchema.optional(),
})

export type ValidatedGameConfig = z.infer<typeof GameConfigObjectSchema>

export type GameConfigInput = Readonly<Record<string, unknown>>

export type GameConfigResult =
  | { readonly ok: true; readonly value: ValidatedGameConfig }
  | { readonly ok: false; readonly violations: readonly GameConfigViolation[] }

function toViolations(error: z.ZodError): readonly GameConfigViolation[] {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "(game)",
    message: issue.message,
  }))
}

function coherenceViolations(input: GameConfigInput): readonly GameConfigViolation[] {
  const resolution = typeof input.resolution === "string" ? input.resolution : undefined
  const hasMechanism = input.resolutionMechanism !== undefined && input.resolutionMechanism !== null
  const out: GameConfigViolation[] = []
  if ((resolution === "dice" || resolution === "hybrid") && !hasMechanism) {
    out.push({
      field: "resolutionMechanism",
      message: `resolution "${resolution}" requires a resolutionMechanism — a game that rolls must declare how it resolves (verb + optional defaultDice/convention)`,
    })
  }
  if (resolution === "none" && hasMechanism) {
    out.push({
      field: "resolutionMechanism",
      message:
        'resolution "none" must not declare a resolutionMechanism — a game that never rolls declares none',
    })
  }
  return out
}

export function validateGameConfig(input: GameConfigInput): GameConfigResult {
  const base = GameConfigObjectSchema.safeParse(input)
  const violations: GameConfigViolation[] = base.success ? [] : [...toViolations(base.error)]
  violations.push(...coherenceViolations(input))
  if (violations.length > 0) return { ok: false, violations }
  if (!base.success) return { ok: false, violations }
  return { ok: true, value: base.data }
}

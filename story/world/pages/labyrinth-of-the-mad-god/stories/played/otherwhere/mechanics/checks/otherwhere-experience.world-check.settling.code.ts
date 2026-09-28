import { z } from "zod"

const PER_LEVEL = 10

const PER_BEAST_LEVEL = 3

const BENEATH = 5

const EARNED = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("kill"),
    level: z.number().int().min(0),
    share: z.enum(["whole", "part"]).default("whole"),
  }),
  z.object({ kind: z.literal("quest"), worth: z.number().int().min(0) }),
])

const GROWTH = z.object({
  character: z.string().trim().min(1),
  level: z.number().int().min(0),
  experience: z.number().int().min(0),
  earned: z.array(EARNED).min(1),
})

type Earned = z.infer<typeof EARNED>

type Grown = {
  readonly gained: number
  readonly level: number
  readonly experience: number
  readonly levelsGained: number
  readonly toNext: number
}

type Settled = { readonly answered: Grown } | { readonly refused: string }

function toNext(level: number): number {
  return PER_LEVEL * (level + 1)
}

function worth(one: Earned, level: number): number {
  if (one.kind === "quest") return one.worth
  if (one.level <= level - BENEATH) return 0
  const full = (one.level + 1) * PER_BEAST_LEVEL
  const weighed = one.level < level ? Math.floor(full / 2) : full
  return one.share === "part" ? Math.floor(weighed / 2) : weighed
}

export function settled(reading: unknown): Settled {
  const held = GROWTH.safeParse(reading)
  if (!held.success) return { refused: `growth reads so: ${z.prettifyError(held.error)}` }
  const { level: from, experience: had, earned } = held.data
  if (had >= toNext(from)) return { refused: "experience already past the next level" }
  const gained = earned.reduce((sum, one) => sum + worth(one, from), 0)
  let level = from
  let experience = had + gained
  while (experience >= toNext(level)) {
    experience -= toNext(level)
    level += 1
  }
  return {
    answered: { gained, level, experience, levelsGained: level - from, toNext: toNext(level) },
  }
}

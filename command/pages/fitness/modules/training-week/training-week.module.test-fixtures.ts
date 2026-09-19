import type { Movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"

export function movement(slug: string, over: Partial<Movement> = {}): Movement {
  return {
    slug,
    title: slug,
    muscles: ["chest"],
    pattern: "h-push",
    category: "strength",
    implement: "dumbbell",
    scoring: "reps",
    sfr: 5,
    force: "push",
    ...over,
  }
}

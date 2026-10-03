import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const theIdleEpochLoopweaver = {
  id: "01a10332-4088-7e1e-a5a4-8167de3e931b",
  type: "page-type/world-class",
  slug: "the-idle-epoch-loopweaver",
  title: "Loopweaver",
  world: "world/the-idle-epoch",
  description:
    "A unique automation class that builds constructs, threads and scripts that run while the caster idles, with Loop Sight, Thread Spinner, Script Engine, Compile Familiar and an Optimization Aura.",
} as const satisfies WorldClass

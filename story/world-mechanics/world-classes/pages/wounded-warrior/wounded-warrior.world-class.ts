import type { WorldClass } from "../../world-class.page-type.ts"

export const woundedWarrior = {
  id: "01a06586-0a84-7302-a9e8-3a4b4e62f2a8",
  pageTypeSlug: "world-class",
  slug: "wounded-warrior",
  title: "Wounded Warrior",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["silversteel-armsmistress"],
  references: "jsonl",
} as const satisfies WorldClass

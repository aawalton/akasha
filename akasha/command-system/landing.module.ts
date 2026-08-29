import type { Module } from "../code-system/module/module.page-type.ts"

export const landing = {
  id: "01a04bdd-596d-7df0-b23c-e52139fd8bc2",
  pageTypeSlug: "module",
  slug: "landing",
  definition: "a change judged against one commit and then written and committed onto it, or refused whole",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    "A change is a base commit and the bodies it would leave, so nothing is serialised to be read straight back.",
    "A body the change does not touch is read from the base commit, never from the working tree, so what is judged is what was proposed.",
    "The commit the change was judged against is the commit it lands on, or it is refused.",
    "One hold spans reading the base, judging, writing and committing, because a gate that ends before the write judged a tree that has moved.",
    "A body reaches disk only after every check has passed, so a refused change leaves nothing behind.",
  ],
  intent: ["A change that was judged is the change that landed."],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaGroupFinderStateMachine = {
  id: "01a0de86-720a-769d-b95c-cedd0632c160",
  type: "page-type/module",
  slug: "pithka-group-finder-state-machine",
  definition: "the idle, searching and joining states the group finder moves between",
  code: "ts",
} as const satisfies Module

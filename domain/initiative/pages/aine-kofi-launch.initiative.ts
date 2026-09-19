import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineKofiLaunch = {
  id: "01a0ba8a-3927-7161-b279-f0e1085942b4",
  type: "page-type/initiative",
  slug: "aine-kofi-launch",
  domain: "domain/kofi",
  persona: "persona/aine",
  constraints: ["Nothing here is done until everything this launch waits on is done."],
  intentStack: [{ statement: "Alan has a Ko-fi page people can back him on." }],
} as const satisfies Initiative

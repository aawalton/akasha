import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineKofiLaunch = {
  id: "01a0ba8a-3927-7161-b279-f0e1085942b4",
  type: "page-type/initiative",
  slug: "aine-kofi-launch",
  domain: "domain/kofi",
  persona: "persona/aine",
  constraints: ["Nothing here is done until everything this launch waits on is done."],
  intentStack: [
    { statement: "Alan has a Ko-fi page people can back him on." },
    {
      statement: "Ko-fi Gold is on before Alan's first member.",
      workingMemory:
        "Ko-fi cannot change the platform fee on a Stripe membership after that membership starts. A membership taken before Gold pays 5% for life; one taken while Gold is on pays nothing for life, even if Gold is cancelled afterwards. A new account defaults into the 5% tier, and Gold is $12 a month.",
    },
  ],
} as const satisfies Initiative

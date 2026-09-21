import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueAuth = {
  id: "01a0b79c-3c98-78fe-97c4-784d7dc13174",
  type: "page-type/initiative",
  slug: "nimue-auth",
  domain: "domain/auth",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "A person signing in to a product sees that product's own name.",
      workingMemory:
        "Branding in Google Cloud belongs to the project rather than to the client, so one project across every site shows one name on every consent screen. A product named on its own needs a project of its own, with its own client, its own secrets and its own consent screen. One project serves all of them until then.",
    },
  ],
} as const satisfies Initiative

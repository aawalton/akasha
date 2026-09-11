import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaWorkstationServiceStability = {
  id: "01a0911d-4745-7cb3-aef6-81176d51a5ea",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aranya-workstation-service-stability",
  domain: "domain/service",
  persona: "aranya",
  intents: [],
  constraints: [
    "Stability rests on no alert and on nothing a person or agent does; a failed service is a fault in the system, mended so that kind of failure becomes impossible.",
  ],
} as const satisfies Initiative

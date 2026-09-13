import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaWorkstationServiceStability = {
  id: "01a0911d-4745-7cb3-aef6-81176d51a5ea",
  type: "initiative",
  slug: "aranya-workstation-service-stability",
  domain: "domain/service",
  persona: "aranya",
  intents: [
    {
      statement: "Every way a change can still break a workstation service is found and closed.",
      workingMemory:
        "1 mechanical changes land unjudged. 2 a closure holds TypeScript alone. 3 the overlay's lower layer is the live checkout. 4 running tests mock the work. 5 a crash loop reads as healthy. 6 the watcher dies on one bad page. 7 nothing joins variables read to secrets declared. 8 a unit's command and its tree move apart. 9 restart policy unmatched to exit codes. 10 unit text written verbatim. 11 one of 46 bounds its work's time. 12 a oneshot failing inside its period is unseen.",
    },
  ],
  constraints: [
    "Stability rests on no alert and on nothing a person or agent does; a failed service is a fault in the system, mended so that kind of failure becomes impossible.",
  ],
} as const satisfies Initiative

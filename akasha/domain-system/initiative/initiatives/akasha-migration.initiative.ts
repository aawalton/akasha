import type { Initiative } from "../initiative.page-type.ts"

export const akashaMigration = {
  id: "01a05324-954d-752a-82d1-e049ecc0f807",
  pageTypeSlug: "initiative",
  slug: "akasha-migration",
  domainSlug: "domain/akasha-migration",
  personaSlug: "akasha",
  notes: [
    "The initiatives standing under this one are the states the migration passes through, and they stand in the order it passes through them: the functional core, seats, seat reading, and akasha alone. Required reading came before seats and is met, so it holds no initiative; what it settled stands as design on the domain of that name. A state that is passed does not stay as an initiative, because an initiative dies once every intent it holds is met, and what it was is in the history.",
    "These were domains before they were initiatives, one for each state, gathered under a domain called akasha-milestone. That shape said what the states were but had nowhere to put the work, so the states were read as things to define rather than things to do. An initiative holds intents and dies when they are met, which is what a milestone was always meant to do, so the milestone concept is gone and nothing replaced it.",
  ],
} as const satisfies Initiative

import type { Domain } from "../domains/domains/domain.page-type.ts"

export const instrument = {
  id: "01a06591-583b-7ae3-907a-e718596a3661",
  pageTypeSlug: "domain",
  slug: "instrument",
  definition: "code kept to be run again, to find out what is true",
  pluralSlug: "instruments",
  partSlugs: ["domain/run-cost"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An instrument may leave marks of its own running.",
    },
    {
      invariantKind: "departure",
      statement: "An instrument never changes what the instrument was run on.",
    },
    {
      invariantKind: "departure",
      statement: "An answer either decides an act or decides nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is refused on an answer that decides nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "An answer that decides an act arrives inside its budget or refuses rather than arriving late.",
    },
    {
      invariantKind: "departure",
      statement: "A run made of other runs is itself a run.",
    },
    {
      invariantKind: "departure",
      statement: "A run has three costs.",
    },
    {
      invariantKind: "departure",
      statement: "A run is never shorter on the clock than the longest run inside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's processor time is the sum of the processor time of every run inside that run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's memory is the largest sum reached by the runs inside that run alive at one moment.",
    },
    {
      invariantKind: "departure",
      statement: "A run past the memory available is killed rather than slowed.",
    },
    {
      invariantKind: "departure",
      statement: "A first run against an empty cache costs more than the run it is.",
    },
    {
      invariantKind: "departure",
      statement: "A budget belongs to where a run is used rather than to the run.",
    },
    {
      invariantKind: "departure",
      statement: "A run held to more than one cost has a budget for each.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Negative Control",
      act: "Make an instrument fail before you trust it.",
      warrant:
        "A blind instrument and a working one both come back clean, and no later run says which you have.",
      aids: [
        "It must catch the planted case, not merely break.",
        "It must also be quiet on a clean case.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Horizon",
      act: "Say how far back a store reaches, beside any report taken from it.",
      warrant:
        "A window and a whole history give the same shape, so a count from either reads as all time.",
      aids: [
        "Your query window is not the store's reach.",
        "A store keeping no history reaches only now.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Bound Before Measuring",
      act: "Set a budget from what waits on the run, never from what the run costs today.",
      warrant:
        "A budget taken from the run's own timing refuses nothing; only what waits can say what is too slow.",
      aids: [
        "Still measure, to see whether the budget is met.",
        "A run that breaks its budget does not raise it.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Population",
      act: "State the population size where an instrument reports, and fail where it could not look at one.",
      warrant:
        "Without the size, a run that looked at nothing and one that found nothing are the same result.",
      aids: [
        "The instrument prints the count, not you.",
        "Anything it skipped is outside the population.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Capability",
      act: "Draw an audit's boundary around the capability it needs, never around the rule it enforces.",
      warrant:
        "Getting the data is what costs, and an audit pays for it once however many rules it holds.",
      aids: [
        "Two rules with no data in common are two audits.",
        "Name an audit for its data, not its first rule.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Read The Limit That Binds",
      act: "Read the limit that runs out, never the one that shares its error message.",
      warrant:
        "One error stands for several limits, so the healthy reading is often of the limit that had room.",
      aids: [
        "A store has as many limits as it has counters.",
        "Exhaust the limit yourself to see what it returns.",
      ],
    },
  ],
} as const satisfies Domain

import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rynStandardAgentEnglish = {
  id: "01a07c11-5ffa-730d-b999-14bed1d3267f",
  type: "page-type/initiative",
  slug: "ryn-standard-agent-english",
  domain: "domain/plain-language",
  persona: "persona/ryn",
  intentStack: [
    {
      statement:
        "The grammar is written out rather than trained, and admits a phrase or refuses it.",
    },
    { statement: "No phrase the grammar admits has a second parse." },
    {
      statement:
        "Each Standard Agent English property names the start symbol its text parses from.",
    },
    {
      statement:
        "A check measures which domain definitions the grammar admits, and runs at no stage.",
    },
    { statement: "Every domain definition akasha holds is admitted by the grammar." },
    { statement: "Every word a phrase uses is a plain word or a word a domain defines." },
  ],
  constraints: [
    "The load a construction puts on a reading agent is measured.",
    "Standard Agent English is designed from first principles, unbiased by current usage.",
    "The reader is an agent rather than a person.",
    "Standard Agent English is built beside the taboo terms and the sentence shapes, and those pages are deleted only once Alan says Standard Agent English is mature.",
    "The grammar starts with no construction.",
    "A construction enters the grammar only where Alan has admitted that construction against examples.",
    "A word enters the lexicon only where Alan has admitted that word, in batches of ten while backfilling.",
  ],
} as const satisfies Initiative

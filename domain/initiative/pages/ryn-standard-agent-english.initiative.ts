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
    "One word, construction, part of speech or phrase kind is put to Alan at a time, with up to five definitions that addition brings closer to admittance.",
    "A word a domain states on its own page enters the lexicon, and any other word enters only where Alan has admitted that word.",
    "A word a taboo term or a banned term names does not enter the lexicon.",
    "A word enters the lexicon only where no plainer word says the same thing everywhere akasha writes that word.",
    "A word the domain around it gives a sense to is declared by that domain rather than entering the lexicon.",
    "A word may be more than one part of speech, and a phrase that word makes ambiguous is refused.",
    "Which word or construction is put to Alan next is chosen here rather than asked of Alan.",
    "The wording put to Alan is the simplest, plainest and clearest, whatever words or constructions that wording needs.",
    "A wording is never chosen for needing fewer new words or constructions.",
    "The next item is one thing the first definition the grammar refuses depends on, put to Alan as that case.",
    "Every turn opens with the definition the grammar refuses first and the words it waits on.",
    "A large change is handed to a subagent, and a small change is landed directly.",
    "Up to twenty subagents work on the refused definitions at once.",
    "Each subagent takes a slice of about twenty refused definitions, and a finished slice frees its place for the next.",
    "Ryn keeps the list of approvals in /var/tmp/claude-1000/-var-home-walton-repos/736f6f9c-fd07-41a2-ad52-572238bd600f/scratchpad/approvals.md.",
    "That list is ordered by how many definitions wait on each item, and once ten items wait on it no new subagent starts until the running ones finish and Alan has answered every item.",
    "A subagent lands a restated definition that needs no new word, construction or part of speech.",
    "A subagent brings back every item that needs Alan's approval, and Ryn puts each item to Alan.",
  ],
} as const satisfies Initiative

import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraCustomPageParser = {
  id: "01a0a680-5e65-77b3-afe6-6e2c5c37bcbe",
  type: "page-type/initiative",
  slug: "astra-custom-page-parser",
  domain: "domain/code-reading",
  persona: "persona/astra",
  intentStack: [
    {
      statement:
        "A parser of akasha's own reads a page body into its value rather than TypeScript.",
      workingMemory:
        "`module/code-source` reads every body with `ts.createSourceFile` out of the `typescript` package, and `module/page-literal` takes the object off the first exported declaration. Both sit under `domain/code-reading`. 82,543 page-shaped `.ts` files are here, 89MB in all. No parser of akasha's own exists.",
    },
    {
      statement:
        "A performance page says the custom parser reads a page body ten times faster than TypeScript.",
      workingMemory:
        "Nothing measures what reading a page body costs. `command/landing-throughput` and `graph/closure/answer-cost` are the two performance pages there are, so the shape to follow is written. Ten is a target Alan can move once the first measurement is in.",
    },
    {
      statement:
        "Every page here parses to the same value under the custom parser as under TypeScript.",
      workingMemory:
        "Untested. Every page file here is the test: read both ways, the two values have to agree key for key. `module/page-literal` states what is read off the object, so its decisions are the contract both parsers are held to.",
    },
    {
      statement: "A page body the custom parser cannot read is refused rather than read wrong.",
      workingMemory:
        "Unwritten. `module/code-source` answers the first fault a recovered parse left, as one line of text. A custom parser guessing at a body it does not understand puts a wrong value in the index silently.",
    },
    {
      statement: "The shape a page body must have is written down as what the custom parser reads.",
      workingMemory:
        "Unwritten. Every page read so far is one import line and one `export const <name> = { ... } as const satisfies <Type>`, holding text, numbers, booleans, lists and nested objects alone. Whether any page file departs from that is unmeasured, and the departures set what the parser handles or refuses.",
    },
  ],
  constraints: [
    "A page body is the database, so a value read wrong is data lost rather than a run gone slow.",
    "TypeScript stays the judge of what a page body means, so the custom parser is held to what TypeScript answers.",
  ],
} as const satisfies Initiative

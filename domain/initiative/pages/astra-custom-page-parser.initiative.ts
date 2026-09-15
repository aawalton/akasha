import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraCustomPageParser = {
  id: "01a0a680-5e65-77b3-afe6-6e2c5c37bcbe",
  type: "page-type/initiative",
  slug: "astra-custom-page-parser",
  domain: "page-type/page",
  persona: "persona/astra",
  intentStack: [
    {
      statement: "A page body is read into its value rather than transpiled and run.",
      workingMemory:
        "`page/modules/value/page-value.module.code.ts` is the one loader every page goes through: `Bun.Transpiler` scans the body's export names, `transformSync` strips the types, a regex strips `export `, and `new Function(js)()` runs the body. 77 non-test files import it. `module/code-source` reads bodies as TypeScript with `ts.createSourceFile`, but that serves the checks rather than this.",
    },
    {
      statement:
        "A performance page says what reading a page body costs under each of the two readers.",
      workingMemory:
        "Nothing measures the loader on its own. One reading of 69,773 pages through `valueAt` took 3,298ms, near 47 microseconds a page, measured by a subagent rather than by me. What a performance page would rest on already runs: `check/modules/cost/check-cost.module.code.ts`, wired into every command at `command/modules/calling/calling.module.code.ts:394`. Alan set no figure to reach: the parser is made as fast as it can be made.",
    },
    {
      statement:
        "Every page here reads to the same value under the custom parser as under the loader.",
      workingMemory:
        "Untested. Every page file here is the test: read both ways, the two values have to agree key for key. `module/page-literal` states what is read off the object a body exports, so its decisions are the contract both readers are held to.",
    },
    {
      statement: "A page body the custom parser cannot read is refused rather than read wrong.",
      workingMemory:
        "Unwritten. The loader catches a throw and answers a `failed` message. It also carries a fault of its own: `new Function` is sometimes handed another body's compiled code, and the loader answers that by retrying eight times with slashes appended. A reader that never runs the body is clear of it.",
    },
    {
      statement: "The shape a page body must have is written down as what the custom parser reads.",
      workingMemory:
        "Unwritten. Every page read so far is one import line and one `export const <name> = { ... } as const satisfies <Type>`, holding text, numbers, booleans, lists and nested objects alone. Whether any of the 82,543 page-shaped `.ts` files departs from that is unmeasured, and the departures set what the parser handles or refuses.",
    },
  ],
  constraints: [
    "A page body is the database, so a value read wrong is data lost rather than a run gone slow.",
    "The loader stays the judge of what a page body means, so the custom parser is held to what the loader answers.",
    "Every akasha call is a fresh bun process, so a page body is read cold on every call that reads it.",
  ],
} as const satisfies Initiative

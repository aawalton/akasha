import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "The check passes over a value a runner reaches by path rather than by import.",
      workingMemory:
        "Eleven are settled and nothing is open here. A route module keeps React Router's names — a route's code, `root.tsx`, `_app-layout.tsx`. Spared by name: a lualib page's `lua-export`, a computed property's `work`, a change guard's `runGuard`, a manifest's `BUILD_ENV`, a performance's `measured`, a type generator's `generateTypes` and `couldTurn`, a tunnel file's `routes`. A command, a check and a model test keep the name made from their slug, and a model test keeps `asking` and `keeping` too.\n",
    },
    {
      statement: "No module exports a value nothing names.",
      workingMemory:
        "1275 refusals in all. 479 are a value only a test names, where the file exporting it never names it either: a module publishing its internals so its own test can reach them. Scaffolding more than one module's tests reach is a `test-fixture` page now, and the code beside such a page sets a test up rather than being code the system runs. Five have moved. The head of what is left is the same shape: `store-writing` holds 11, `repo-seeding` 10, `page-holding` 6, `fixture-world` 5.",
    },
    {
      statement: "No file the broad unexport run left alone still publishes a value only it names.",
      workingMemory:
        "8 refusals over 6 files. `introduced-property-is-a-part`'s decision has a test red at HEAD from a regression in `pages/types/modules/declared-properties`, and holds three. `check-cost`, `code-tests`, `alan-tracking`, `temper-inventory-plan` and `subagent-page-naming` hold one each and came after the run.\n",
    },
    {
      statement: "Every uncommitted body beside a page exports the name that page's writer makes.",
      workingMemory:
        "6 `service-workstation` bodies still carry export names from before that page type was renamed. `pages/modules/uncommitted/page-uncommitted.module.code.ts` makes the name a writer uses now. Each is rewritten the next time its service writes, and most of the 24 first seen have cleared themselves that way.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative

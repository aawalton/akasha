import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const nimueCodeCleanup = {
  id: "01a07693-7ea9-7fa0-ab70-5d8e33381c8c",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "nimue-code-cleanup",
  domain: "domain/code-system",
  persona: "nimue",
  intents: [
    {
      statement: "No code spells a path as a string literal.",
      workingMemory:
        "Both holes are closed. `askingOver` resolves a literal opening with a dot from the folder the spelling file sits in, and `namingIn` reads a literal again from each separator, as `ranIn` has always read a body outside TypeScript. Driven over the whole index the way the audit wires it, the check answers 189 refusals over 97 files where it answered 7 over 4: 32 new in a page's own code and 150 new in a test, none in a generator or a fixture. What is left is the remediation, not the reach.",
    },
    {
      statement: "A change moving a folder repoints the manifest naming that folder.",
      workingMemory:
        "A live folder move leaves the manifest stale, shown by drafting two. `change-manifest-ways` reads only `exports`, so `main`, `scripts`, `bin` and `files` are invisible to it. `waysNaming` gates on that same member read as whole paths, and the root states one wildcard export, so the gate shuts for every move there is. A move repoints a TypeScript import specifier and nothing else. `folder-not-left-named` cannot catch this, judging only the bodies a move writes.\n",
    },
    {
      statement: "All code-system files are in the code/ folder.",
      workingMemory:
        "`move-folder` at `code-system` to `code` refuses at `app-building.module.test.ts`, which spells `code-system/ios-apps/pages/alanwalton`. The guard reads non-TypeScript through `path-runs`, so the older note that it reads TypeScript alone is wrong. Its real blockers are `writtenIn` at `folder-not-left-named.change-guard.code.ts:85`, reading only the bodies the move writes, and the `startsWith` in `namedBy` at 49-55, matching a root-spelled path alone.",
    },
    {
      statement: "The code folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path code-system` judges 561 files and answers 1 refusal, at the repository root, where `akasha.domain.ts` and `akasha-workspace.workspace.ts` sit as two pages in one folder. That refusal is the workspace's rather than this initiative's. What is left is the move itself, and there is no `code` folder yet.\n",
    },
  ],
  constraints: [
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
    "Up to twenty agents work at once, each one carrying one migration.",
  ],
} as const satisfies Initiative

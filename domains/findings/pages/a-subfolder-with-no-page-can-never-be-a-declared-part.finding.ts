import type { Finding } from "../finding.page-type.types.ts"

export const aSubfolderWithNoPageCanNeverBeADeclaredPart = {
  id: "01a08807-e84e-7ead-87b3-71bb759d1df9",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-subfolder-with-no-page-can-never-be-a-declared-part",
  domain: "page-type/folder-shape",
  claim:
    "A folder holding no page of its own answers nothing when a shape asks what that folder holds, so no page above it can name it a part and every folder holding one is refused too. Whether a shape may take a folder with no page therefore settles more folders than the ones refused for it: seven parents of mine cannot clear whatever else is right about them.",
  evidence:
    "`holdingOver` in `checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.code.ts` answers `NOTHING` for a folder whose `pairedIn` finds no single page, and `NOTHING` carries an empty `holds`. `a-domain-with-its-parts.folder-shape.code.ts` keeps a subfolder only where `held.some((one) => declared.has(one))`, and an empty `held` makes that false for every declaration that could ever be written. `a-page-type-with-its-parts.folder-shape.code.ts` runs the same filter. Only a subfolder named `modules` or `scripts` escapes it, and under a page type also `pages`, `properties` and `workstation-services`.\n\nSo the two questions are one question. These seven folders are each refused for a subfolder that holds no page, and no data mend reaches any of them:\n\n`seat-system` for `messaging`, `recipient-resolving`, `supervising` and `terminal-init`, each holding module folders and no page of its own; `google/email` for `commands`, which holds only `email-command-reading`; `language-design/lua-compiler` for `lualibs`, which holds eighty-five library folders and no page; `language-design/lua-compiler/lualib` for `src`, which holds `5.0` and `universal` and no page.\n\nThree more are refused by the same filter for the neighbouring reason that the subfolder holds two pages rather than none, which answers empty in exactly the same way: `editor-extension` for `vscode-typings`, `domains/standard-agent-english` for `terms`, and `instrument` for `run-cost`.\n\nThe count that matters for the ruling is therefore not the eighteen folders refused for holding no page. It is those eighteen and the seven above them, and a rule that a shape may take a folder with no page would have to say what such a folder answers when a shape asks what it holds, or the parents stay refused.",
} as const satisfies Finding

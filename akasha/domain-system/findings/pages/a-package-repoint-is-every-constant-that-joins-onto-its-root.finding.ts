import type { Finding } from "../finding.page-type.ts"

export const aPackageRepointIsEveryConstantThatJoinsOntoItsRoot = {
  id: "01a06798-4d53-7001-99dc-22205557575d",
  pageTypeSlug: "finding",
  slug: "a-package-repoint-is-every-constant-that-joins-onto-its-root",
  domainSlug: "workspace-package/temper-addon-build",
  claim:
    "A repoint of a package is a file's worth of constants, not a line's. The switchover brief for `lua-build-command.module.code.ts` named only line 4, `COMPILER_PACKAGE`. The file held two more old-tree-relative constants, `COMPILER_ENTRY` and `PLUGIN_DIR`, that the brief missed — it was written from a grep for the specifier rather than from reading the file. Repointing line 4 alone would have left `tstlCommand()` naming an entry that does not exist and both plugins unreachable.",
  evidence:
    'Landed as two commits: `697b30c302` (the brief\'s line, `COMPILER_PACKAGE = "akasha/language-design/lua-compiler"`) and `8357c79155` (`COMPILER_ENTRY` repointed to `"tstl-cli/tstl-cli.module.code.ts"`, `PLUGIN_DIR` removed and replaced with two full relative `PLUGIN_FILES` paths). Verified by reading both diffs: the first touches one line; the second touches 11 lines, six insertions and five deletions, in the same file. The old constants read `COMPILER_ENTRY = "src/cli/tstl.ts"` and `PLUGIN_DIR = "src/plugins"` with `.js` plugin filenames (`tstl-no-truthy-numbers.js`, `tstl-no-multi-store.js`); the landed package is flat with no `src/` and carries only the `.ts` plugins, each in its own directory (`tstl-plugin-tstl-no-truthy-numbers/`, `tstl-plugin-tstl-no-multi-store/`). Repointing line 4 alone left `tstlCommand()` naming an entry `existsSync` finds false and both plugins unreachable — the gate typechecked and refused the first attempt at the second commit for leaving `PLUGIN_DIR` dangling, so the file landed whole or not at all. Rule: when repointing a package, read every constant in the file that joins onto the package root.',
} as const satisfies Finding

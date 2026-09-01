import type { Finding } from "../finding.page-type.ts"

export const aChangeAcrossTwoPackagesIsJudgedAgainstTheOldOne = {
  id: "01a05b4b-2137-7324-9b54-9c820de1bbd0",
  pageTypeSlug: "finding",
  slug: "a-change-across-two-packages-is-judged-against-the-old-one",
  domainSlug: "workspace-package/checks-system",
  claim:
    "A change carrying two packages is judged with the reaching package's new code against the reached package's committed code, because a bare specifier resolves through node_modules into the tree as it stands rather than into the change. One commit adding an export and its caller cannot land; the work splits in two, and between those commits the tree does not typecheck. The same hole would hide a cross-package break whose old body still satisfies the new caller.",
  evidence:
    "One `akasha write` carried a new export in `service-system/cluster-service/web-app-building/web-app-building.module.code.ts` and its caller in `command-system/command/deploy/deploy.command.code.ts`, which names the reach as `@akasha/service-system/web-app-building`. The gate refused: `SyntaxError: Export named 'declaredBuildEnv' not found in module '/var/home/walton/repos/akasha/akasha/service-system/cluster-service/web-app-building/web-app-building.module.code.ts'` — an absolute path into the real tree, not into whatever world the change was staged in, so the specifier walked out of the change and back to HEAD. Splitting it landed both halves: 9bc5d59654 carried the module, ffa06ec48a carried the caller, and the first had to give the new parameters defaults so the still-committed caller would keep typechecking in between. Sibling reaches inside one package are spelled as relative paths and are not affected. This sits next to the naming work already in flight, where `landingOf` was made to read a naming built from the manifests a change carries rather than through node_modules; the test runner appears not to have been given the same treatment.",
} as const satisfies Finding

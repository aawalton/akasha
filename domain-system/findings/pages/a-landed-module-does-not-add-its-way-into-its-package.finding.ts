import type { Finding } from "../finding.page-type.ts"

export const aLandedModuleDoesNotAddItsWayIntoItsPackage = {
  id: "01a06296-260b-7ad4-9ab3-3992c59d79fe",
  pageTypeSlug: "finding",
  slug: "a-landed-module-does-not-add-its-way-into-its-package",
  domainSlug: "domain/temper",
  claim:
    "A workspace package's `package.json` is not written from its page. Six modules landed with every check passing and not one of the six could be reached from outside the package, because the manifest still named only the modules it already named. The check meant for this judges the entries the manifest already holds, so a module the manifest omits is not looked at. A package can be whole, judged clean, and unreachable.",
  evidence:
    'Measured 2026-09-02. `269672842a` landed six modules into `akasha/temper/temper-upstream-data` and answered "40 checks judged the 15 paths asked for, and none refused". Straight afterwards `Bun.resolveSync` from the repository root answered MISS for all six of `@akasha/temper-upstream-data/leaf-dump`, `/upstream-leaf-reading`, `/housing-upstream-verify`, `/map-data-upstream-verify`, `/treasure-upstream-verify` and `/zone-upstream-verify`, and the package.json still listed the five ways in it carried before. Writing that manifest by hand in the next change, `ededda62c9`, made all six resolve.\n\nWhy no check caught it. `manifest-names-what-is-reached` starts from the entries the manifest holds and asks whether each lands on a file. A module the manifest omits is not an entry, so nothing reaches it. A check that can only see what is declared is blind to what is undeclared and reports clean either way.\n\nWhy it is easy to assume otherwise. The page states `manifest: "json"`, and `workspace-package.page-type.ts` says "The manifest names every way into the package" and "A domain becomes a workspace package by stating a manifest", which read as though stating a part is enough to be named.\n\nWhy it stays quiet. The six modules typechecked clean inside the package, because siblings reach each other by relative path rather than through the manifest. Only a reader outside the package meets the gap, and the command that needed them was a separate change.',
} as const satisfies Finding

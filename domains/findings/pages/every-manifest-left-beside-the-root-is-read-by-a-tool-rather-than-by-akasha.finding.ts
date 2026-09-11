import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const everyManifestLeftBesideTheRootIsReadByAToolRatherThanByAkasha = {
  id: "01a08d74-b3e6-7db6-a102-00cfaa8e61f8",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "every-manifest-left-beside-the-root-is-read-by-a-tool-rather-than-by-akasha",
  domain: "domain/code-system",
  claim:
    "Folding the last twelve manifests takes a tool changing rather than a specifier repointing, because each one is read by a tool that finds it by walking up from a folder.",
  evidence:
    "Seven web apps: react-router resolves an app root to the nearest ancestor manifest, which `alan/web-capacitor`'s own description states is what keeps its build off the route tree beside it. Three ios-apps: Capacitor discovers its plugins from the manifest's dependencies and the `cap` scripts run with that folder as the working directory. `editor-extension/vscode-typings` and `editor-extension/ops-extension` are packages because vscode reads them as packages. Every other manifest folded with no tool touched: 48 eso-addons, the cluster manifests and ten more.",
} as const satisfies Finding

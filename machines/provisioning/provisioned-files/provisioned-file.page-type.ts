import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Content } from "./properties/content.file-property.ts"
import type { InstallPath } from "./properties/install-path.text-property.ts"
import type { OnlyOn } from "./properties/only-on.select-property.ts"
import type { PlacedBy } from "./properties/placed-by.select-property.ts"
import type { ReloadWith } from "./properties/reload-with.text-property.ts"

export type ProvisionedFile = Domain & {
  content: Content
  placedBy: PlacedBy
  onlyOn: OnlyOn
  installPath?: InstallPath
  reloadWith?: ReloadWith
}

export const provisionedFile = {
  id: "01a06861-49aa-70de-9ba6-733c82989f81",
  pageTypeSlug: "page-type",
  slug: "provisioned-file",
  definition: "a file a machine is set up by putting where something outside akasha reads it",
  pluralSlug: "provisioned-files",
  partSlugs: [
    "file-property/content",
    "provisioned-file/bashrc",
    "provisioned-file/btw5-udev-rule",
    "provisioned-file/claude-keepalive-sysctl",
    "provisioned-file/container-insecure-registries",
    "provisioned-file/container-short-names",
    "provisioned-file/git-config",
    "provisioned-file/git-global-ignore",
    "provisioned-file/home-search-ignore",
    "provisioned-file/macbook-brewfile",
    "provisioned-file/profile",
    "provisioned-file/repos-editor-settings",
    "provisioned-file/swap-used-limit",
    "provisioned-file/swapfile-unit",
    "provisioned-file/tmux-config",
    "provisioned-file/wallpaper-black-launcher",
    "provisioned-file/workstation-brewfile",
    "provisioned-file/zshrc",
    "select-property/only-on",
    "select-property/placed-by",
    "text-property/install-path",
    "text-property/reload-with",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "content", required: true, many: false },
    { pagePropertySlug: "placed-by", required: true, many: false },
    { pagePropertySlug: "only-on", required: true, many: false },
    { pagePropertySlug: "install-path", required: false, many: false },
    { pagePropertySlug: "reload-with", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name the body stands under outside akasha is stated rather than spelled by the file.",
    },
    {
      invariantKind: "departure",
      statement: "A file read where it stands states no path to be put at.",
    },
    {
      invariantKind: "departure",
      statement: "A machine that the file is not for is said by what the file is only on.",
    },
    {
      invariantKind: "departure",
      statement:
        "What makes a placed file take effect is stated by the page rather than by the placer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here places a file; a page only says where the file goes.",
    },
  ],
} as const satisfies PageType

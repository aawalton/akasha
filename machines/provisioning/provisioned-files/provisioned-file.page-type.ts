import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const provisionedFile = {
  id: "01a06861-49aa-70de-9ba6-733c82989f81",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "provisioned-file",
  definition: "a file a machine is set up by putting where something outside akasha reads it",
  pluralSlug: "provisioned-files",
  parts: [
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
    "select-property/only-on",
    "select-property/placed-by",
    "text-property/install-path",
    "text-property/reload-with",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/content", required: true, many: false },
    { pageProperty: "select-property/placed-by", required: true, many: false },
    { pageProperty: "select-property/only-on", required: true, many: false },
    { pageProperty: "text-property/install-path", required: false, many: false },
    { pageProperty: "text-property/reload-with", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name the body sits under outside akasha is stated rather than spelled by the file.",
    },
    {
      invariantKind: "departure",
      statement: "A file read where it is states no path to be put at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A machine that the file is not for is said by the kind of machine the file is only on.",
    },
    {
      invariantKind: "departure",
      statement:
        "The command making a placed file take effect is stated by the page rather than by the placer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here places a file.",
    },
    {
      invariantKind: "absence",
      statement: "A page only says where a file goes.",
    },
  ],
  types: "ts",
} as const satisfies PageType

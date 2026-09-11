import type { ProvisionedFile } from "akasha/infrastructure/machines/provisioning/provisioned-files/provisioned-file.page-type.types.ts"

export const tmuxScopeSlice = {
  id: "01a0927d-1cbd-780f-aff8-2bacc9b0c011",
  type: "provisioned-file",
  slug: "tmux-scope-slice",
  definition: "which slice every scope tmux makes for a seat is put in",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/tmux-.scope.d/10-seats.conf",
  reloadWith: "systemctl --user daemon-reload",
  invariants: [
    {
      invariantKind: "departure",
      statement: "tmux states app.slice on every scope tmux makes, and this states another.",
    },
    {
      invariantKind: "departure",
      statement: "The name is the run of dashes systemd reads a drop-in for every tmux scope at.",
    },
    {
      invariantKind: "departure",
      statement: "A scope already running keeps the control group that scope was made in.",
    },
  ],
} as const satisfies ProvisionedFile

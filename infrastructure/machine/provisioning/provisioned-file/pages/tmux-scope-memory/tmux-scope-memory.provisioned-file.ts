import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const tmuxScopeMemory = {
  id: "01a0b731-ec1a-7ecb-9116-b0acbb609736",
  type: "page-type/provisioned-file",
  slug: "tmux-scope-memory",
  definition: "how much memory a scope tmux makes for a seat may hold",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/tmux-.scope.d/30-memory.conf",
  reloadWith: "systemctl --user daemon-reload",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceiling is held by each seat alone rather than by the seats together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling on the scope holds over every process and thread the seat begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One seat over the ceiling is ended without the other seats being reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceiling is half of what the seats hold together.",
    },
  ],
} as const satisfies ProvisionedFile

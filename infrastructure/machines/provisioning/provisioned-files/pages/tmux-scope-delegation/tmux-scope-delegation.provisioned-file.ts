import type { ProvisionedFile } from "akasha/infrastructure/machines/provisioning/provisioned-files/provisioned-file.page-type.types.ts"

export const tmuxScopeDelegation = {
  id: "01a0931d-840e-7dbe-a5f7-5bc1b4c375ea",
  type: "provisioned-file",
  slug: "tmux-scope-delegation",
  definition: "whether a seat manages the control groups inside its own scope",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/tmux-.scope.d/20-delegation.conf",
  reloadWith: "systemctl --user daemon-reload",
  invariants: [
    {
      invariantKind: "departure",
      statement: "systemd turns no controller on inside a scope systemd hands over.",
    },
    {
      invariantKind: "departure",
      statement: "A group holding processes of its own turns no controller on for its children.",
    },
    {
      invariantKind: "departure",
      statement: "What is turned on here outlasts a reload and goes when the scope goes.",
    },
  ],
} as const satisfies ProvisionedFile

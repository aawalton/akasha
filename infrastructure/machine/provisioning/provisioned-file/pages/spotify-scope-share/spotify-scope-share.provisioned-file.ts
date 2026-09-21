import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const spotifyScopeShare = {
  id: "01a0c527-5ba5-74d9-9c88-f302e660a76f",
  type: "page-type/provisioned-file",
  slug: "spotify-scope-share",
  definition: "the share Spotify holds against the window Alan is looking at",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/app-flatpak-com.spotify.Client-.scope.d/90-share.conf",
  reloadWith: "systemctl --user daemon-reload",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The window Alan is looking at is raised to a share of ten thousand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An app holding the share systemd ships is left a hundredth of that window's.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The booster puts an app back to the shipped share once Alan looks elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify holds a share of the same order as the window Alan is looking at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The share is named to be read after the booster's, so the booster leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The share reaches every launch, since what Spotify runs under ends in a number.",
    },
  ],
} as const satisfies ProvisionedFile

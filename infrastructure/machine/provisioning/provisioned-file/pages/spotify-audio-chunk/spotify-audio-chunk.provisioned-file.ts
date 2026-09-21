import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const spotifyAudioChunk = {
  id: "01a0c527-2a1a-7736-a1fc-2e4bf11a2a2f",
  type: "page-type/provisioned-file",
  slug: "spotify-audio-chunk",
  definition: "the stretch of sound Spotify is asked for at a time",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/pipewire/pipewire-pulse.conf.d/10-spotify-chunk.conf",
  reloadWith: "systemctl --user restart pipewire-pulse",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is asked for a longer stretch than the graph itself works on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sound server holds what Spotify hands over early, so a stall is ridden out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is matched by the name Spotify gives itself.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A rule here is read when the sound server starts rather than when Spotify does.",
    },
  ],
} as const satisfies ProvisionedFile

import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const smallestAudioChunk = {
  id: "01a0c526-fa62-791b-9dc7-6046fc96ba7d",
  type: "page-type/provisioned-file",
  slug: "smallest-audio-chunk",
  definition: "the shortest span of sound the audio graph works on",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/pipewire/pipewire.conf.d/10-smallest-chunk.conf",
  reloadWith: "pw-metadata -n settings 0 clock.min-quantum 1024",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every app sending sound works on the shortest span of sound any one of them asks for.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A shorter span of sound leaves an app less room to be late before the sound breaks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No app takes that span below what is written here by asking for less.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That span is set live rather than by starting the sound server again.",
    },
  ],
  createdAt: "2026-09-21T18:07:41.154Z",
  updatedAt: "2026-10-30T17:41:43.669Z",
} as const satisfies ProvisionedFile

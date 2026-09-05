import {
  type InferenceHost,
  InferenceHostSchema,
} from "../inference-schema/inference-schema.module.code.ts"

export const HOSTS: Readonly<Record<string, InferenceHost>> = {
  macbook: InferenceHostSchema.parse({
    name: "macbook",
    address: "100.64.0.2",
    user: "walton",
    keyPath: "~/.ssh/id_ed25519",
    home: "/Users/walton",
    condaSh: "/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh",
  }),
}

export function getHost(name: string): InferenceHost {
  const host = HOSTS[name]
  if (host === undefined) {
    throw new Error(`unknown inference host: ${name} (known: ${Object.keys(HOSTS).join(", ")})`)
  }
  return host
}

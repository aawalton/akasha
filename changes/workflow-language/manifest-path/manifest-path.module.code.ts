import { generatedPathFor } from "@akasha/k8s-synth/generated-file"

export function manifestPath(synthPath: string, name: string): string {
  return generatedPathFor(synthPath, name)
}

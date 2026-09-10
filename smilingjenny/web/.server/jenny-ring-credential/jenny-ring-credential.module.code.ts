import { refuseUncredentialedRingCaller as refuseUncredentialed } from "akasha/readouts/serving/readout-serving.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const RING_CREDENTIAL_NAME = "SMILINGJENNY_RING_CREDENTIAL"

export function ringCredential(): string | undefined {
  return optionalEnv(RING_CREDENTIAL_NAME)
}

export function refuseUncredentialedRingCaller(request: Request): Response | null {
  return refuseUncredentialed(request, ringCredential())
}

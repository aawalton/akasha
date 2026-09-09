import { refuseUncredentialedRingCaller as refuseUncredentialed } from "akasha/readouts/serving/readout-serving.module.code.ts"

const RING_CREDENTIAL_NAME = "SMILINGJENNY_RING_CREDENTIAL"

export function ringCredential(): string | undefined {
  return process.env[RING_CREDENTIAL_NAME]
}

export function refuseUncredentialedRingCaller(request: Request): Response | null {
  return refuseUncredentialed(request, ringCredential())
}

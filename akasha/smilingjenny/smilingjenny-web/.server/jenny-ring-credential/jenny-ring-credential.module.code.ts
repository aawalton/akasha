import { refuseUncredentialedRingCaller as refuseUncredentialed } from "@akasha/readout-system/readout-serving"

const RING_CREDENTIAL_NAME = "SMILINGJENNY_RING_CREDENTIAL"

export function ringCredential(): string | undefined {
  return process.env[RING_CREDENTIAL_NAME]
}

export function refuseUncredentialedRingCaller(request: Request): Response | null {
  return refuseUncredentialed(request, ringCredential())
}

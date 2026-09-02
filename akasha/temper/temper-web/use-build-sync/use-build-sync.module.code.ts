"use client"

import { useSingleFlight } from "@akasha/design-primitives/use-single-flight"
import { useEffect, useRef } from "react"

interface UseBuildSyncOptions<TBuild, TAction, TMeta> {
  localBuild: TBuild
  zeroBuildHash: string | null
  zeroBuildMetadata: TMeta | null
  updateRemote: (hash: string, metadata: TMeta) => Promise<void>
  dispatch: React.Dispatch<TAction>
  createResetAction: (payload: TBuild) => TAction
  initialBuildHash: string
  encode: (build: TBuild) => string
  decode: (hash: string, metadata: TMeta) => TBuild
  extractMetadata: (build: TBuild) => TMeta
}

export function useBuildSync<TBuild, TAction, TMeta>({
  localBuild,
  zeroBuildHash,
  zeroBuildMetadata,
  updateRemote,
  dispatch,
  createResetAction,
  initialBuildHash,
  encode,
  decode,
  extractMetadata,
}: UseBuildSyncOptions<TBuild, TAction, TMeta>) {
  const hasReceivedRemoteData = useRef(false)
  const lastSyncedHashRef = useRef<string>(initialBuildHash)
  const singleFlightUpdate = useSingleFlight(updateRemote)

  useEffect(() => {
    if (zeroBuildHash == null || !zeroBuildMetadata) return

    if (!hasReceivedRemoteData.current) {
      hasReceivedRemoteData.current = true
      if (zeroBuildHash !== initialBuildHash) {
        const decoded = decode(zeroBuildHash, zeroBuildMetadata)
        dispatch(createResetAction(decoded))
        lastSyncedHashRef.current = encode(decoded)
      }
      return
    }

    if (zeroBuildHash === lastSyncedHashRef.current) {
      return
    }

    const decoded = decode(zeroBuildHash, zeroBuildMetadata)
    dispatch(createResetAction(decoded))
    lastSyncedHashRef.current = encode(decoded)
  }, [
    zeroBuildHash,
    zeroBuildMetadata,
    initialBuildHash,
    dispatch,
    createResetAction,
    decode,
    encode,
  ])

  useEffect(() => {
    if (!hasReceivedRemoteData.current) {
      return
    }

    const currentHash = encode(localBuild)

    if (currentHash === lastSyncedHashRef.current) {
      return
    }

    lastSyncedHashRef.current = currentHash
    const metadata = extractMetadata(localBuild)
    singleFlightUpdate(currentHash, metadata)
  }, [localBuild, singleFlightUpdate, encode, extractMetadata])
}

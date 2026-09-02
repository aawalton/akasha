"use client"

import { useCallback, useRef } from "react"

export function useSingleFlight<Args extends readonly unknown[], R>(
  fn: (...args: Args) => Promise<R>
): (...args: Args) => Promise<R> {
  type UpNext = {
    resolve: (value: R) => undefined
    reject: (reason: unknown) => undefined
    args: Args
  }
  const flightStatus = useRef<{ inFlight: boolean; upNext: UpNext | null }>({
    inFlight: false,
    upNext: null,
  })

  return useCallback(
    (...args: Args): Promise<R> => {
      if (flightStatus.current.inFlight) {
        return new Promise<R>((resolve, reject) => {
          flightStatus.current.upNext = {
            resolve: (value: R): undefined => {
              resolve(value)
            },
            reject: (reason: unknown): undefined => {
              reject(reason)
            },
            args,
          }
        })
      }
      flightStatus.current.inFlight = true
      const firstReq = fn(...args)
      void (async () => {
        try {
          await firstReq
        } catch {}
        while (flightStatus.current.upNext) {
          const cur = flightStatus.current.upNext
          flightStatus.current.upNext = null
          await fn(...cur.args)
            .then(cur.resolve)
            .catch(cur.reject)
        }
        flightStatus.current.inFlight = false
      })()
      return firstReq
    },
    [fn]
  )
}

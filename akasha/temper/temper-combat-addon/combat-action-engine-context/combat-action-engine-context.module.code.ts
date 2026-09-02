export type UpdateCallback = (this: void, now: number) => undefined

const UPDATE_CALLBACKS: UpdateCallback[] = []

export function onEngineUpdate(callback: UpdateCallback): undefined {
  UPDATE_CALLBACKS.push(callback)
}

export function fireEngineUpdate(now: number): undefined {
  for (const callback of UPDATE_CALLBACKS) {
    callback(now)
  }
}

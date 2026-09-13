export function guardTick(tick: () => unknown, onError: (err: unknown) => void): undefined {
  let result: unknown
  try {
    result = tick()
  } catch (err) {
    onError(err)
    return
  }
  void Promise.resolve(result).catch(onError)
}

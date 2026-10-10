type Schedule = (this: void, run: (this: void) => undefined, delayMs: number) => number

type Cancel = (this: void, handle: number) => void

export function trailingCall(
  this: void,
  schedule: Schedule,
  cancel: Cancel,
  delayMs: number,
  run: (this: void) => undefined
): (this: void) => undefined {
  let handle: number | undefined
  return function (this: void): undefined {
    if (handle !== undefined) cancel(handle)
    handle = schedule(function (this: void): undefined {
      handle = undefined
      run()
    }, delayMs)
  }
}

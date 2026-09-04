export interface TerminalDeathEffects {
  sigtermChild: () => void
  sigkillChild: () => void
  exit: () => void
  schedule: (onElapsed: () => void) => () => void
}

export interface TerminalDeathController {
  onDeath: () => boolean
  onChildExited: () => void
}

export function createTerminalDeathController(
  effects: TerminalDeathEffects
): TerminalDeathController {
  let armed = false
  let exited = false
  let cancelBackstop: (() => void) | undefined

  return {
    onDeath(): boolean {
      if (armed || exited) return false
      armed = true
      effects.sigtermChild()
      cancelBackstop = effects.schedule(() => {
        effects.sigkillChild()
        effects.exit()
      })
      return true
    },
    onChildExited(): undefined {
      if (exited) return
      exited = true
      cancelBackstop?.()
      cancelBackstop = undefined
    },
  }
}

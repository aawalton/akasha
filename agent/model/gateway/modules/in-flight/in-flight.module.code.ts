type InFlightTracker = {
  readonly begin: () => undefined
  readonly end: () => undefined
  readonly getCount: () => number
}

export function buildInFlightTracker(): InFlightTracker {
  let count = 0

  function begin(): undefined {
    count += 1
  }

  function end(): undefined {
    count = Math.max(0, count - 1)
  }

  function getCount(): number {
    return count
  }

  return { begin, end, getCount }
}

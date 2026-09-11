interface Performance {
  now: (this: void) => number
}

declare const performance: Performance

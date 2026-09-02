declare function setTimeout(this: void, fn: (this: void) => void, ms: number): number

declare function setInterval(this: void, fn: (this: void) => void, ms: number): number

declare const clearTimeout: (this: void, handle: number) => void

declare const clearInterval: (this: void, handle: number) => void

declare const queueMicrotask: (this: void, fn: (this: void) => void) => void

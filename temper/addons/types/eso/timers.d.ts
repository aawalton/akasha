declare function setTimeout(this: void, fn: (this: void) => void, ms: number): number

declare function setInterval(this: void, fn: (this: void) => void, ms: number): number

declare function clearTimeout(this: void, handle: number): void

declare function clearInterval(this: void, handle: number): void

declare function queueMicrotask(this: void, fn: (this: void) => void): void

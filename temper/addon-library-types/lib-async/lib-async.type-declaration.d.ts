interface AsyncTask {
  Call: <A extends unknown[]>(fn: (this: void, ...args: A) => unknown) => AsyncTask
  Then: <A extends unknown[]>(fn: (this: void, ...args: A) => unknown) => AsyncTask
  Finally: <A extends unknown[]>(fn: (this: void, ...args: A) => unknown) => AsyncTask
  Do: <A extends unknown[]>(fn: (this: void, ...args: A) => unknown) => AsyncTask
  For: (startIndex: number, endIndex: number, step?: number) => AsyncTask
  Cancel: () => AsyncTask
  StopTimer: () => AsyncTask
}

interface LibAsyncLib {
  Create: (name: string) => AsyncTask
  For: (startIndex: number, endIndex: number) => AsyncTask
  Call: <A extends unknown[]>(fn: (this: void, ...args: A) => unknown) => AsyncTask
  GetDebug: () => boolean
  SetDebug: (enabled: boolean) => void
}

declare var LibAsync: LibAsyncLib

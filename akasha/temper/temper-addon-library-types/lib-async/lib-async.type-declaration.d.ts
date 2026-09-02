type AsyncCallback = (this: void, ...args: unknown[]) => unknown

interface AsyncTask {
  Call: (fn: AsyncCallback) => AsyncTask
  Then: (fn: AsyncCallback) => AsyncTask
  Finally: (fn: AsyncCallback) => AsyncTask
  Do: (fn: AsyncCallback) => AsyncTask
  Cancel: () => AsyncTask
  StopTimer: () => AsyncTask
}

interface LibAsyncLib {
  Create: (name: string) => AsyncTask
  For: (startIndex: number, endIndex: number) => AsyncTask
}

declare const LibAsync: LibAsyncLib

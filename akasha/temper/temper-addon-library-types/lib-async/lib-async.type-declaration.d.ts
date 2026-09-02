type AsyncCallback = (this: void, ...args: never[]) => unknown

interface AsyncTask {
  Call: (fn: AsyncCallback) => AsyncTask
  Then: (fn: AsyncCallback) => AsyncTask
  Finally: (fn: AsyncCallback) => AsyncTask
  Do: (fn: AsyncCallback) => AsyncTask
  Cancel: () => AsyncTask
  StopTimer: () => AsyncTask
  For: (startIndex: number, endIndex: number, step?: number) => AsyncTask
}

interface LibAsyncLib {
  Create: (name: string) => AsyncTask
  For: (startIndex: number, endIndex: number) => AsyncTask
}

declare const LibAsync: LibAsyncLib

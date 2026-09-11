function isDisposable(value: object): value is Disposable {
  return Symbol.dispose in value
}

function isAsyncDisposable(value: object): value is AsyncDisposable {
  return Symbol.asyncDispose in value
}

export async function __TS__UsingAsync<TArgs extends Array<Disposable | AsyncDisposable>, TReturn>(
  this: undefined,
  cb: (...args: TArgs) => TReturn,
  ...args: TArgs
): Promise<TReturn> {
  let thrownError
  const [ok, result] = xpcall(
    () => cb(...args),
    (err) => (thrownError = err)
  )

  const argArray = [...args]
  for (let i = argArray.length - 1; i >= 0; i--) {
    const arg = argArray[i]
    if (isDisposable(arg)) {
      arg[Symbol.dispose]()
    }
    if (isAsyncDisposable(arg)) {
      await arg[Symbol.asyncDispose]()
    }
  }

  if (!ok) {
    throw thrownError
  }

  return result
}

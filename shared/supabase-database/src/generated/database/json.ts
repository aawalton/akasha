// DO NOT EDIT BY HAND. `Json`, lifted out of the Supabase generated types so that the
// table and function shards can name it without importing the barrel that imports them.
// The barrel re-exports it, so `Json` is still read from where it always was.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

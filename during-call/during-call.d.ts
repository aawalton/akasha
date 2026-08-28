export declare function duringOneCall<T>(run: () => T): T;
export declare function onceInCall<T>(key: string, make: () => T): T;
export declare function holdInCall<T>(key: string, value: T): void;
